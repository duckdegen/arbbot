import { AbiItem, StateMutabilityType } from 'web3-utils';

interface ClaimAbiItem extends AbiItem {
  stateMutability?: StateMutabilityType;
}
export const claimAbi: ClaimAbiItem[] = [
  {
    inputs: [
      {
        internalType: 'contract IERC20VotesUpgradeable',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: '_sweepReceiver',
        type: 'address',
      },
      { internalType: 'address', name: '_owner', type: 'address' },
      { internalType: 'uint256', name: '_claimPeriodStart', type: 'uint256' },
      { internalType: 'uint256', name: '_claimPeriodEnd', type: 'uint256' },
      { internalType: 'address', name: 'delegateTo', type: 'address' },
    ],
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'CanClaim',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'HasClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newSweepReceiver',
        type: 'address',
      },
    ],
    name: 'SweepReceiverSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Swept',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdrawal',
    type: 'event',
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'delegatee', type: 'address' },
      { internalType: 'uint256', name: 'expiry', type: 'uint256' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'claimAndDelegate',
    outputs: [],
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimPeriodEnd',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimPeriodStart',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'claimableTokens',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_recipients', type: 'address[]' },
      {
        internalType: 'uint256[]',
        name: '_claimableAmount',
        type: 'uint256[]',
      },
    ],
    name: 'setRecipients',
    outputs: [],
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_sweepReceiver',
        type: 'address',
      },
    ],
    name: 'setSweepReciever',
    outputs: [],
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [],
    name: 'sweep',
    outputs: [],
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [],
    name: 'sweepReceiver',
    outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
    stateMutability: 'view' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [],
    name: 'token',
    outputs: [
      {
        internalType: 'contract IERC20VotesUpgradeable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalClaimable',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable' as StateMutabilityType,
    type: 'function',
  },
];
