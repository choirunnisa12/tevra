import { useContract, useContractRead, useContractWrite, useAccount } from 'wagmi';
import { CONTRACTS, TOKENS } from '@/lib/constants';
import { TevraBotABI } from '@/lib/abi';

export function useTevraBot() {
  return useContract({
    address: CONTRACTS.TEVRA_BOT as `0x${string}`,
    abi: TevraBotABI,
  });
}

export function useUserRuleCount() {
  const { address } = useAccount();
  return useContractRead({
    address: CONTRACTS.TEVRA_BOT as `0x${string}`,
    abi: TevraBotABI,
    functionName: 'getUserRuleCount',
    args: address ? [address] : undefined,
    enabled: !!address,
  });
}

export function useUserRule(ruleId: number) {
  const { address } = useAccount();
  return useContractRead({
    address: CONTRACTS.TEVRA_BOT as `0x${string}`,
    abi: TevraBotABI,
    functionName: 'getUserRule',
    args: address && ruleId !== undefined ? [address, BigInt(ruleId)] : undefined,
    enabled: !!address && ruleId !== undefined,
  });
}

export function useCreateRule() {
  return useContractWrite({
    address: CONTRACTS.TEVRA_BOT as `0x${string}`,
    abi: TevraBotABI,
    functionName: 'createRule',
  });
}

export function useAutoTopup() {
  return useContractWrite({
    address: CONTRACTS.TEVRA_BOT as `0x${string}`,
    abi: TevraBotABI,
    functionName: 'autoTopup',
  });
}

export function useAutoWithdraw() {
  return useContractWrite({
    address: CONTRACTS.TEVRA_BOT as `0x${string}`,
    abi: TevraBotABI,
    functionName: 'autoWithdraw',
  });
}
