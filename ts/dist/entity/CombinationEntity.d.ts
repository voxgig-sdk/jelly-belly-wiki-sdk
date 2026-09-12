import { JellyBellyWikiEntityBase } from '../JellyBellyWikiEntityBase';
import type { JellyBellyWikiSDK } from '../JellyBellyWikiSDK';
import type { Control } from '../types';
import type { Combination, CombinationListMatch } from '../JellyBellyWikiTypes';
declare class CombinationEntity extends JellyBellyWikiEntityBase<Combination> {
    constructor(client: JellyBellyWikiSDK, entopts: any);
    make(this: CombinationEntity): CombinationEntity;
    list(this: any, reqmatch?: CombinationListMatch, ctrl?: Control): Promise<CombinationEntity[]>;
}
export { CombinationEntity };
