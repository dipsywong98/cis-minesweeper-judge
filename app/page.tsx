import HelloWorld from './hello.mdx'
import './markdown.css'
 
export default function Page() {
  return (
    <div className='markdown-body' style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{maxWidth: '1000px'}}>
        <HelloWorld />
      </div>
    </div>
  )
}