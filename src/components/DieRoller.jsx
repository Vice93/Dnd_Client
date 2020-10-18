import React, { useState } from 'react'
import { rollDie } from '../utils/RollClient'
import { Button, Typography, Card, CardContent, FormControl, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import ContentContainer from './ContentContainer'
import { openSnackbar } from '../components/Lib'

const useStyles = makeStyles(theme => ({
  welcomeCard: {
    textAlign: 'center',
    padding: 20,
    margin: 10
  },
  cardContainer: {
    padding: 0,
    display: 'flex'
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  form: {
    width: '100%'
  }
}))

export default function DieRoller() {
	const classes = useStyles()

  const [roll, setRoll] = useState()
  const [dSize, setdSize] = useState('')
  const [dRolls, setdRolls] = useState('')
  const [mod, setMod] = useState('')
  const [keep, setKeep] = useState('')

  const getRoll = () => {
    if(dSize == '')
      return openSnackbar('warning', 'Please set a die size')
    if(dRolls == '')
      return openSnackbar('warning', 'Please set roll amount')

    rollDie(dSize, dRolls, mod, keep).then(r => {
      if(!r.success)
        return openSnackbar('error', r.message)
      setRoll(r.data)
    })
  }

  const enterPressed = (e) => {
    if (e.key === 'Enter')
      getRoll()
  }

  return (
    <ContentContainer>
      <Card className={classes.welcomeCard}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">Dice roller (WIP)</Typography>
          <p>Use this tool to roll any dice you want</p>
          <CardContent>
            <form className={classes.form}>
              <FormControl onKeyPress={enterPressed}>
                <div className={classes.formRow}>
                  <TextField value={dSize} onInput={e => setdSize(e.target.value)} autoFocus variant="outlined" margin="normal" required fullWidth id="diesize"
                    label="Die size" name="diesize" type="number" />
                  <TextField value={dRolls} onInput={e => setdRolls(e.target.value)} variant="outlined" margin="normal" required fullWidth name="dierolls"
                    label="Die rolls" id="drolls" type="number" />
                </div>
                <div className={classes.formRow}>
                  <TextField value={mod} onInput={e => setMod(e.target.value)} variant="outlined" margin="normal" fullWidth name="mod"
                    label="Modifier" id="mod" type="number" />
                  <TextField value={keep} onInput={e => setKeep(e.target.value)} variant="outlined" margin="normal" fullWidth name="keep"
                    label="Keep" id="keep" type="number" />
                </div>
              </FormControl>
            </form>
            {
              roll &&
              <div>
                <p>Notation: {roll.notation}</p>
                <p>Rolls: {roll.output.substr(roll.output.indexOf('['))}</p>
                <p>Total: {roll.total}</p>
              </div>
            }
          </CardContent>
          <Button variant="contained" color="secondary" onClick={getRoll}>Roll dice</Button>
        </CardContent>
      </Card>
    </ContentContainer>
  )
}