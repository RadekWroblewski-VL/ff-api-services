import { APIClient, APIMapping } from '../../http';
import { CaasManagementServiceTypes } from './CaasManagementService.Types';

export class DatabaseController extends APIClient {
    constructor() {
        super(APIMapping.caasManamgentService);
    }

    /**
     * Fetches all databases
     */
    async fetchAllDatabases() {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Database.GetAllResponse>('/databases', 'GET');
    }

    /**
     * Fetches the database with the given id
     * @param id
     */
    async fetchDatabase(id: string) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Database.Database>(`/databases/${id}`, 'GET');
    }

    /**
     * Creates a database with the given configuration
     * @param databaseConfiguration
     */
    async createDatabase(databaseConfiguration: CaasManagementServiceTypes.Database.Create) {
        return this.invokeApiWithErrorHandling<CaasManagementServiceTypes.Database.Database>('/databases', 'POST', databaseConfiguration);
    }

    /**
     * Deletes the database with the given id
     * @param id
     */
    async deleteDatabase(id: string) {
        return this.invokeApiWithErrorHandling(`/databases/${id}`, 'DELETE');
    }
}