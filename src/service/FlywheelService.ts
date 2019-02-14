import { APIClient, APIMapping } from '../http';
import Phase from '../models/Phase';
import Flywheel from '../models/Flywheel';
import { AxiosResponse } from 'axios';

export class FlywheelService extends APIClient {

    constructor() {
        super(APIMapping.flywheelService);
    }

    /**
     * Creates a new flywheel based on the title
     * @param title
     */
    async createFlywheel(title: string) {
        return this.invokeApi<Flywheel>('/flywheels', 'POST', {
            title: title
        });
    }

    /**
     * Deletes a flywheel based on the name (id)
     * @param flywheelName
     */
    async deleteFlywheel(flywheelName: string) {
        return this.invokeApi(`/flywheels/${flywheelName}`, 'DELETE');
    }

    /**
     * Returns all flywheels with no param given or no-content
     */
    async fetchAllFlywheels() {
        return this.invokeApi<Flywheel[]>('/flywheels', 'GET');
    }

    /**
     * only for dev
     */
    async fetchAllMocks() {
        return this.invokeApi<Flywheel[]>('/flywheels/mockAll', 'GET');
    }

    /**
     * Return a specific flywheel by name or not-found
     * @param flywheelName
     */
    async fetchFlywheel(flywheelName: string) {
        return this.invokeApi<Flywheel>(`/flywheels/${flywheelName}`);
    }

    /**
     * Returns all phases which have childrens
     */
    async fetchAllKanbans() {
        return this.invokeApi<Phase[]>('/phases', 'GET', undefined, {
            queryParams: {
                filters: JSON.stringify({
                    type: 'EXCLUDE_PHASE_STEPS'
                })
            }
        });
    }

    async fetchAllPhases() {
        return this.invokeApi<Phase[]>('/phases', 'GET');
    }

    /**
     * Return a specific phase with all subphases
     * @param phaseName
     */
    async fetchPhase(phaseName: string) {
        return this.invokeApi<Phase>(`/phases/${phaseName}`);
    }

    /**
     * Return all transactions for a specific phase
     * @param phaseName
     */
    async fetchTransactionsForPhase(phaseName: string) {
        return this.invokeApi(`/transactions/phases/${phaseName}`);
    }

    /**
     * Moves a transaction to another phase
     */
    async moveTransaction(transactionId: string, fromPhaseName: string, toPhaseName: string) {
        return this.invokeApi(`/transactions/${transactionId}`, 'PUT', {fromPhaseName, toPhaseName});
    }

    /**
     * Creates or updates a phase.
     */
    async createPhase(phase: object): Promise<AxiosResponse> {
        return this.invokeApi('/phases', 'POST', phase);
    }

    async updatePhase(phase: object): Promise<AxiosResponse> {
        return this.invokeApi('/phases', 'PUT', phase, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async deletePhase(phaseName: string): Promise<AxiosResponse> {
        return this.invokeApi(`/phases/${phaseName}`, 'DELETE');
    }

    async updatePhases(flywheelName: string, phaseNames: string[]) {
        return this.invokeApi<Flywheel>(
            `/flywheels/${flywheelName}`, 'PATCH',
            [{
                op: 'set-phases',
                phaseNames: phaseNames
            }],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json'
                }
            }
        );
    }
}

export default new FlywheelService();
