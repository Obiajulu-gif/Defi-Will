// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title DefiWill
 * @dev Smart contract for managing digital asset inheritance on Avalanche
 */
contract DefiWill is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    struct Beneficiary {
        address beneficiaryAddress;
        uint256 percentage; // Percentage of assets (basis points, 10000 = 100%)
        string name;
        bool isActive;
    }

    struct Will {
        address owner;
        uint256 lastActivity;
        uint256 inactivityPeriod; // Time in seconds before will is triggered
        bool isActive;
        bool isTriggered;
        uint256 createdAt;
        string encryptedData; // IPFS hash of encrypted will data
    }

    struct AssetAllocation {
        address tokenAddress; // Address(0) for native AVAX
        uint256 amount;
        bool isPercentage; // If true, amount is percentage, else fixed amount
    }

    // Mappings
    mapping(address => Will) public wills;
    mapping(address => Beneficiary[]) public beneficiaries;
    mapping(address => AssetAllocation[]) public assetAllocations;
    mapping(address => mapping(address => bool)) public authorizedExecutors;
    mapping(address => uint256) public willCount;

    // Events
    event WillCreated(address indexed owner, uint256 inactivityPeriod);
    event WillUpdated(address indexed owner, uint256 newInactivityPeriod);
    event BeneficiaryAdded(address indexed owner, address indexed beneficiary, uint256 percentage);
    event BeneficiaryRemoved(address indexed owner, address indexed beneficiary);
    event ActivityRecorded(address indexed owner, uint256 timestamp);
    event WillTriggered(address indexed owner, uint256 timestamp);
    event AssetDistributed(address indexed owner, address indexed beneficiary, address token, uint256 amount);
    event ExecutorAuthorized(address indexed owner, address indexed executor);
    event ExecutorRevoked(address indexed owner, address indexed executor);

    // Modifiers
    modifier onlyWillOwner() {
        require(wills[msg.sender].owner == msg.sender, "Not will owner");
        require(wills[msg.sender].isActive, "Will not active");
        _;
    }

    modifier onlyAuthorizedExecutor(address willOwner) {
        require(
            authorizedExecutors[willOwner][msg.sender] || msg.sender == willOwner,
            "Not authorized executor"
        );
        _;
    }

    /**
     * @dev Create a new will
     * @param _inactivityPeriod Time in seconds before will can be triggered
     * @param _encryptedData IPFS hash of encrypted will data
     */
    function createWill(
        uint256 _inactivityPeriod,
        string memory _encryptedData
    ) external {
        require(_inactivityPeriod >= 30 days, "Minimum 30 days inactivity period");
        require(!wills[msg.sender].isActive, "Will already exists");

        wills[msg.sender] = Will({
            owner: msg.sender,
            lastActivity: block.timestamp,
            inactivityPeriod: _inactivityPeriod,
            isActive: true,
            isTriggered: false,
            createdAt: block.timestamp,
            encryptedData: _encryptedData
        });

        willCount[msg.sender] = 1;
        emit WillCreated(msg.sender, _inactivityPeriod);
    }

    /**
     * @dev Record activity to reset the deadman switch
     */
    function recordActivity() external onlyWillOwner {
        wills[msg.sender].lastActivity = block.timestamp;
        emit ActivityRecorded(msg.sender, block.timestamp);
    }

    /**
     * @dev Add a beneficiary to the will
     * @param _beneficiaryAddress Address of the beneficiary
     * @param _percentage Percentage of assets (in basis points)
     * @param _name Name of the beneficiary
     */
    function addBeneficiary(
        address _beneficiaryAddress,
        uint256 _percentage,
        string memory _name
    ) external onlyWillOwner {
        require(_beneficiaryAddress != address(0), "Invalid beneficiary address");
        require(_percentage > 0 && _percentage <= 10000, "Invalid percentage");
        
        // Check total percentage doesn't exceed 100%
        uint256 totalPercentage = _percentage;
        for (uint i = 0; i < beneficiaries[msg.sender].length; i++) {
            if (beneficiaries[msg.sender][i].isActive) {
                totalPercentage += beneficiaries[msg.sender][i].percentage;
            }
        }
        require(totalPercentage <= 10000, "Total percentage exceeds 100%");

        beneficiaries[msg.sender].push(Beneficiary({
            beneficiaryAddress: _beneficiaryAddress,
            percentage: _percentage,
            name: _name,
            isActive: true
        }));

        emit BeneficiaryAdded(msg.sender, _beneficiaryAddress, _percentage);
    }

    /**
     * @dev Remove a beneficiary from the will
     * @param _beneficiaryIndex Index of the beneficiary to remove
     */
    function removeBeneficiary(uint256 _beneficiaryIndex) external onlyWillOwner {
        require(_beneficiaryIndex < beneficiaries[msg.sender].length, "Invalid beneficiary index");
        
        address beneficiaryAddress = beneficiaries[msg.sender][_beneficiaryIndex].beneficiaryAddress;
        beneficiaries[msg.sender][_beneficiaryIndex].isActive = false;
        
        emit BeneficiaryRemoved(msg.sender, beneficiaryAddress);
    }

    /**
     * @dev Check if a will can be triggered (deadman switch activated)
     * @param _willOwner Address of the will owner
     */
    function canTriggerWill(address _willOwner) public view returns (bool) {
        Will memory will = wills[_willOwner];
        return (
            will.isActive &&
            !will.isTriggered &&
            block.timestamp >= will.lastActivity + will.inactivityPeriod
        );
    }

    /**
     * @dev Trigger a will and distribute assets
     * @param _willOwner Address of the will owner
     */
    function triggerWill(address _willOwner) external onlyAuthorizedExecutor(_willOwner) nonReentrant {
        require(canTriggerWill(_willOwner), "Cannot trigger will yet");
        
        wills[_willOwner].isTriggered = true;
        
        // Distribute native AVAX
        uint256 nativeBalance = _willOwner.balance;
        if (nativeBalance > 0) {
            _distributeAssets(_willOwner, address(0), nativeBalance);
        }

        // Distribute ERC20 tokens based on asset allocations
        AssetAllocation[] memory allocations = assetAllocations[_willOwner];
        for (uint i = 0; i < allocations.length; i++) {
            if (allocations[i].tokenAddress != address(0)) {
                IERC20 token = IERC20(allocations[i].tokenAddress);
                uint256 balance = token.balanceOf(_willOwner);
                if (balance > 0) {
                    _distributeAssets(_willOwner, allocations[i].tokenAddress, balance);
                }
            }
        }

        emit WillTriggered(_willOwner, block.timestamp);
    }

    /**
     * @dev Internal function to distribute assets to beneficiaries
     * @param _willOwner Address of the will owner
     * @param _tokenAddress Address of the token (address(0) for native AVAX)
     * @param _totalAmount Total amount to distribute
     */
    function _distributeAssets(
        address _willOwner,
        address _tokenAddress,
        uint256 _totalAmount
    ) internal {
        Beneficiary[] memory willBeneficiaries = beneficiaries[_willOwner];
        
        for (uint i = 0; i < willBeneficiaries.length; i++) {
            if (willBeneficiaries[i].isActive) {
                uint256 amount = (_totalAmount * willBeneficiaries[i].percentage) / 10000;
                
                if (_tokenAddress == address(0)) {
                    // Transfer native AVAX
                    payable(willBeneficiaries[i].beneficiaryAddress).transfer(amount);
                } else {
                    // Transfer ERC20 token
                    IERC20(_tokenAddress).safeTransferFrom(
                        _willOwner,
                        willBeneficiaries[i].beneficiaryAddress,
                        amount
                    );
                }
                
                emit AssetDistributed(
                    _willOwner,
                    willBeneficiaries[i].beneficiaryAddress,
                    _tokenAddress,
                    amount
                );
            }
        }
    }

    /**
     * @dev Authorize an executor for the will
     * @param _executor Address of the executor to authorize
     */
    function authorizeExecutor(address _executor) external onlyWillOwner {
        require(_executor != address(0), "Invalid executor address");
        authorizedExecutors[msg.sender][_executor] = true;
        emit ExecutorAuthorized(msg.sender, _executor);
    }

    /**
     * @dev Revoke executor authorization
     * @param _executor Address of the executor to revoke
     */
    function revokeExecutor(address _executor) external onlyWillOwner {
        authorizedExecutors[msg.sender][_executor] = false;
        emit ExecutorRevoked(msg.sender, _executor);
    }

    /**
     * @dev Update will inactivity period
     * @param _newInactivityPeriod New inactivity period in seconds
     */
    function updateInactivityPeriod(uint256 _newInactivityPeriod) external onlyWillOwner {
        require(_newInactivityPeriod >= 30 days, "Minimum 30 days inactivity period");
        wills[msg.sender].inactivityPeriod = _newInactivityPeriod;
        emit WillUpdated(msg.sender, _newInactivityPeriod);
    }

    /**
     * @dev Get beneficiaries for a will owner
     * @param _willOwner Address of the will owner
     */
    function getBeneficiaries(address _willOwner) external view returns (Beneficiary[] memory) {
        return beneficiaries[_willOwner];
    }

    /**
     * @dev Get will information
     * @param _willOwner Address of the will owner
     */
    function getWill(address _willOwner) external view returns (Will memory) {
        return wills[_willOwner];
    }

    /**
     * @dev Emergency pause function (only owner)
     */
    function pauseWill() external onlyWillOwner {
        wills[msg.sender].isActive = false;
    }

    /**
     * @dev Reactivate paused will
     */
    function reactivateWill() external {
        require(wills[msg.sender].owner == msg.sender, "Not will owner");
        require(!wills[msg.sender].isActive, "Will already active");
        wills[msg.sender].isActive = true;
        wills[msg.sender].lastActivity = block.timestamp;
    }
}
