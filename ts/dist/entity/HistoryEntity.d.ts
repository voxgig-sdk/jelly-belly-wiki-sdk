import { JellyBellyWikiEntityBase } from '../JellyBellyWikiEntityBase';
import type { JellyBellyWikiSDK } from '../JellyBellyWikiSDK';
import type { Control } from '../types';
import type { History, HistoryListMatch } from '../JellyBellyWikiTypes';
declare class HistoryEntity extends JellyBellyWikiEntityBase<History> {
    constructor(client: JellyBellyWikiSDK, entopts: any);
    make(this: HistoryEntity): HistoryEntity;
    list(this: any, reqmatch?: HistoryListMatch, ctrl?: Control): Promise<HistoryEntity[]>;
}
export { HistoryEntity };
