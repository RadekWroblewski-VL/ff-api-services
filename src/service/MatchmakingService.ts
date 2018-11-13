import { AxiosResponse } from 'axios';
import { APIClient, APIMapping } from '../http';
import { Contact } from '../util/ContactModels';
import { MatchCountForEstate, MatchmakingPagingResponse, MatchScore } from '../util/MatchmakingModels';

export class MatchmakingService extends APIClient {

    constructor() {
        super(APIMapping.matchmakingService);
    }


    getAllMatches(page: number = 0): Promise<AxiosResponse<MatchmakingPagingResponse<Array<Contact>>>> {
        return this.invokeApi('/matches', 'GET', undefined, {
            queryParams: { page }
        });
    }

    getMatchesByContact(contactId: string, page: number = 0): Promise<AxiosResponse<MatchmakingPagingResponse<Array<MatchScore>>>> {
        return this.invokeApi(`/matches/contact/${contactId}`, 'GET', undefined, {
            queryParams: { page }
        });
    }

    getMatchesByEstate(estateId: string, page: number = 0): Promise<AxiosResponse<MatchmakingPagingResponse<Array<MatchScore>>>> {
        return this.invokeApi(`/matches/estate/${estateId}`, 'GET', undefined, {
            queryParams: { page }
        });
    }

    getMatchCountByEstate(estateId: string): Promise<AxiosResponse<MatchCountForEstate>> {
        return this.invokeApi(`/matches/estate/${estateId}/count`, 'GET');
    }

    initialImport(): Promise<AxiosResponse> {
        return this.invokeApi('/trigger/initial', 'POST');
    }
}

export default new MatchmakingService();
