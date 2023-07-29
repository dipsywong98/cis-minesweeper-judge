'use client'
import './page.css'

export default function Page() {
  return <iframe src={window.location.href.replace('#', '/index.html#')} />
}