import { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

import { UiContext, CartContext } from '../../context'


export const Navbar = () => {


    const { asPath, push } = useRouter()

    const { toggleSideMenu } = useContext(UiContext)
    const { numberOfItems } = useContext(CartContext)

    const [searchTerm, setsearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)



    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        push(`/search/${searchTerm}`)
    }



    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6' color={"white"}>GianStore</Typography>
                    </Link>
                </NextLink>


                {/* todo flex */}
                <Box flex={1}
                />

                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className="fadeIn"
                >
                    <NextLink href='/category/men' passHref>
                        <Link marginRight={"10px"}>
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/women' passHref>
                        <Link marginRight={"10px"}>
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                        </Link>
                    </NextLink>

                    <NextLink href='/category/kid' passHref>
                        <Link>
                            <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>





                {/* todo flex */}
                <Box flex={1} />

                {/* Pantallas grandes */}

                {
                    isSearchVisible
                        ? (

                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                color="info"
                                className='fadeIn'
                                autoFocus
                                value={searchTerm}
                                onChange={(e) => setsearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            color="info"
                                            onClick={() => setIsSearchVisible(false)}


                                        >
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        : (
                            <IconButton
                                onClick={() => setIsSearchVisible(true)}
                                className="fadeIn"
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                color="info"
                            >
                                <SearchOutlined />
                            </IconButton>
                        )
                }





                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton>

                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton color="info">
                            <Badge badgeContent={numberOfItems} color='secondary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>


                <Button onClick={toggleSideMenu}>
                    Menu
                </Button>

            </Toolbar>

        </AppBar>
    )
}
