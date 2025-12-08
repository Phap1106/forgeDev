// src/billing/blockchain.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type ExplorerType = 'etherscan_v2';

export interface CheckTxResult {
  confirmed: boolean;
  raw: any;
}

@Injectable()
export class BlockchainService {
  private readonly etherscanApiKey: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.etherscanApiKey = this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  /**
   * Kiểm tra tx trên Etherscan V2 (đa chain)
   * details.chainId sẽ xác định chain (1: ETH, 8453: Base, 56: BSC nếu hỗ trợ,...)
   */
  async checkTxOnEtherscanV2(
    txHash: string,
    chainId: number,
  ): Promise<CheckTxResult> {
    if (!this.etherscanApiKey) {
      throw new InternalServerErrorException(
        'ETHERSCAN_API_KEY is not configured',
      );
    }

    const baseUrl = 'https://api.etherscan.io/v2/api';

    const url = new URL(baseUrl);
    url.searchParams.set('module', 'transaction');
    url.searchParams.set('action', 'gettxreceiptstatus');
    url.searchParams.set('txhash', txHash);
    url.searchParams.set('chainid', String(chainId));
    url.searchParams.set('apikey', this.etherscanApiKey);

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new InternalServerErrorException(
        `Etherscan request failed with status ${res.status}`,
      );
    }

    const data = await res.json();

    const confirmed =
      data?.status === '1' && data?.result && data.result.status === '1';

    return {
      confirmed,
      raw: data,
    };
  }
}
