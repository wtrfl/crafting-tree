import React from 'react'

export default function Loader() {
  return (
    <center style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div class="lds-facebook"><div></div><div></div><div></div></div>
        <span style={{ fontSize: '0.8rem', color: "#9e9e9e", marginTop: -10}}>Waiting for response...</span>
    </center>
  )
}
