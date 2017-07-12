import React from 'react'
import { render } from 'react-dom'
import App from 'components/App'
import './styles/main.css'

const root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)

render(<App message="Hello World" />, root)