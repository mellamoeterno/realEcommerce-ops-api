import express from 'express'
import cors from 'cors'
import { MockProductRepository } from './repositories/mockProductRepository'
import { StockInvestigationService } from './services/stockInvestigationService'
import { stockRoutes } from './routes/stockRoutes'

const app = express()
app.use(cors())
app.use(express.json())

const productRepository = new MockProductRepository()
const stockService = new StockInvestigationService(productRepository)

app.get('/health', (_req, res) => res.json({ ok: true}))
app.use('/api/stock', stockRoutes(stockService))

const port = Number(process.env.PORT ?? 4000)
app.listen(port, () => {
    console.log(`ops api listening on http://localhost:${port}`)
});