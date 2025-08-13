// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DefiWill.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title WillFactory
 * @dev Factory contract for creating and managing DefiWill contracts
 */
contract WillFactory is Ownable {
    
    struct WillInfo {
        address willContract;
        address owner;
        uint256 createdAt;
        bool isActive;
    }

    // Mappings
    mapping(address => address[]) public userWills;
    mapping(address => WillInfo) public willInfo;
    address[] public allWills;

    // Events
    event WillContractCreated(address indexed owner, address indexed willContract, uint256 timestamp);
    event WillContractDeactivated(address indexed willContract);

    /**
     * @dev Create a new DefiWill contract for a user
     * @param _inactivityPeriod Initial inactivity period
     * @param _encryptedData IPFS hash of encrypted will data
     */
    function createWillContract(
        uint256 _inactivityPeriod,
        string memory _encryptedData
    ) external returns (address) {
        
        DefiWill newWill = new DefiWill();
        address willAddress = address(newWill);
        
        // Initialize the will
        newWill.createWill(_inactivityPeriod, _encryptedData);
        
        // Transfer ownership to the user
        newWill.transferOwnership(msg.sender);
        
        // Store will information
        userWills[msg.sender].push(willAddress);
        willInfo[willAddress] = WillInfo({
            willContract: willAddress,
            owner: msg.sender,
            createdAt: block.timestamp,
            isActive: true
        });
        allWills.push(willAddress);
        
        emit WillContractCreated(msg.sender, willAddress, block.timestamp);
        return willAddress;
    }

    /**
     * @dev Get all wills for a user
     * @param _user Address of the user
     */
    function getUserWills(address _user) external view returns (address[] memory) {
        return userWills[_user];
    }

    /**
     * @dev Get total number of wills created
     */
    function getTotalWills() external view returns (uint256) {
        return allWills.length;
    }

    /**
     * @dev Get will information by contract address
     * @param _willContract Address of the will contract
     */
    function getWillInfo(address _willContract) external view returns (WillInfo memory) {
        return willInfo[_willContract];
    }

    /**
     * @dev Deactivate a will contract (emergency function)
     * @param _willContract Address of the will contract to deactivate
     */
    function deactivateWill(address _willContract) external onlyOwner {
        require(willInfo[_willContract].isActive, "Will already inactive");
        willInfo[_willContract].isActive = false;
        emit WillContractDeactivated(_willContract);
    }
}
