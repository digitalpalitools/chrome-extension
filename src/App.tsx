import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { getCurrentTabUId } from './chrome/utils'
import { ChromeMessage, Sender } from './types'

export default () => {
  const [url, setUrl] = useState<string | undefined>('')
  const [responseFromContent, setResponseFromContent] = useState<string>('')

  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true }

    if (chrome.tabs) {
      chrome.tabs.query(queryInfo, (tabs) => {
        setUrl(tabs[0].url)
      })
    }
  }, [])

  const sendTestMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: 'Hello from React',
    }

    getCurrentTabUId((id) => {
      if (id) {
        chrome.tabs.sendMessage(id, message, (responseFromContentScript) => {
          setResponseFromContent(responseFromContentScript)
        })
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>URL:</p>
        <p>{url}</p>
        <button onClick={sendTestMessage}>SEND MESSAGE</button>
        <p>Response from content:</p>
        <p>{responseFromContent}</p>
      </header>
    </div>
  )
}
