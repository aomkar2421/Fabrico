import { Button, Card, CardContent, styled, Typography } from '@mui/material'
import React from 'react'

const TriangleImg = styled("img")({
    right:0,
    bottom:0,
    height:170,
    position:"absolute"
})

const TrophyImg = styled("img")({
    right:36, 
    bottom:20,
    height:98,
    position:"absolute"
})            

const Achivement = () => {
  return (
<Card sx={{ position: "relative", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)" }}>
<CardContent>
        <Typography variant="h6" sx={{ letterSpacing: ".25px" }}>
          Shop With Zosh
        </Typography>
        <Typography variant='body2'>
          Congratulations
        </Typography>
        <Typography variant='h5' sx={{my:3.1}}>
          420.8k
        </Typography>
        <Button size="small" variant="contained">
          View Sales
        </Button>
        <TriangleImg src=''></TriangleImg>
        <TrophyImg src='https://imgs.search.brave.com/pzqsol7I8huYMw2ZnNnnbwn2-O9SdBbs9FB3nrdfvg8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzg0LzY3LzAy/LzM2MF9GXzI4NDY3/MDI4Nl9WQjRFRW5T/MDFzYnFsdWVpRmth/OUJPM1M1YkVGaG54/Mi5qcGc' />
      </CardContent>
    </Card>
  )
}

export default Achivement