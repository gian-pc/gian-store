import { useContext, FC } from 'react';
import { Grid, Typography } from "@mui/material"
import { CartContext } from '../../context/cart/CartContext';
import { currency } from "../../utils";


interface Props {
    orderValues?: {
        numberOfItems: number,
        subTotal: number,
        igv: number,
        total: number
    }
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {


    const { numberOfItems, subTotal, igv, total } = useContext(CartContext)

    const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total, igv }


    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{summaryValues.numberOfItems} {summaryValues.numberOfItems > 1 ? 'productos' : 'producto'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(summaryValues.subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(summaryValues.igv)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }} display='flex' justifyContent='end'>
                <Typography variant="subtitle1">{currency.format(summaryValues.total)}</Typography>
            </Grid>
        </Grid>
    )
}
