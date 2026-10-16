import { Router } from 'express'
import { StockInvestigationService } from '../services/stockInvestigationService'
import { Severity } from '../types'

export function stockRoutes(service: StockInvestigationService){
    const router = Router()

    router.get('/issues', async (req, res) => {
        try {
            const all = await service.investigateAll()
            const severity = req.query.severity as Severity | undefined;

            const issues = severity ? all.filter((i) => i.severity === severity) : all;

            const counts = all.reduce<Record<string, number>>((acc, i) => {
                acc[i.severity] = (acc[i.severity] ?? 0) + 1;
                return acc;
            }, {});

            res.json({ total: issues.length, counts, issues})
            } catch(err) {
            console.log(err)
            res.status(500).json({ error: 'failed to investigate stock'})
            }
            });
    }
