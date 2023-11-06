import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
import {deleteCookie, getCookie, setCookie} from 'cookies-next'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                HMS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const defaultTheme = createTheme()

export default function SignInSide() {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')

    const getRedirect = () => {
        const redirect = getCookie('redirect')
        if (redirect) {
            deleteCookie('redirect')
            return redirect.toString()
        }

        return '/'
    }

    const login = async (e: SyntheticEvent) => {
        e.preventDefault()

        setSubmitting(true)

        if(userName === '' || passWord === '') {
            return
        }
        const authbody = JSON.stringify({
            username: userName,
            password: passWord
        })
        console.log(authbody)
        console.log(userName, passWord);
        const authRes = await fetch(process.env.NEXT_PUBLIC_API + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: authbody,
        })

        console.log(authRes);

        // If external API returns 200 OK, set a cookie with the user information and JWT token
        if (authRes.ok) {
            const authData = await authRes.json()
            if(authData.jwt===""){
                console.log('Login failed.');
            }else{
                const token = authData.jwt
                const user = authData.user
                setCookie('token', token, { maxAge: 30 * 24 * 60 * 60 })
                setCookie('user', user, { maxAge: 30 * 24 * 60 * 60 })
                setCookie('auth',authData, { maxAge: 30 * 24 * 60 * 60 })
                router.push(getRedirect())
            }
        } else {
            console.log('Login failed.');
        }
        setSubmitting(false)
    }

  return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: 'url(/images/background.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t: any) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
            >
              <Typography component="h1" variant="h3" align='center'>
                Hostal Management System
              </Typography>
              <Avatar sx={{ m: 1, bgcolor: '#1976D2' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={login} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus
                    disabled={submitting}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassWord(e.target.value)}
                    disabled={submitting}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={submitting}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
  )
}
