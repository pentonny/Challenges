import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
function Header(props){
  console.log('props', props, props.tittle);
  return <header>
  <h1><a href='/' onClick={
  (event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.tittle}</a></h1>
</header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.tittle}</a></li>)
  }
  return <nav>
        <ol>
          {lis}
        </ol>
      </nav>
}
function Article(props){
  return <article>
  <h2>{props.tittle}</h2>
  {props.body}
</article>
}
function Create(props){
  return <article>
    <h2>Creat</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const tittle = event.target.tittle.value;
      const body = event.target.body.value;
      props.onCreate(tittle, body);
    }}>
      <p><input type="text" name="tittle" placeholder='tittle'/></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value='Create'></input></p>
    </form>
  </article>
}
function Update(props){
  const [tittle, setTittle] = useState(props.tittle);
  const [body,  setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const tittle = event.target.tittle.value;
      const body = event.target.body.value;
      props.onUpdate(tittle, body);
    }}>
      <p><input type="text" name="tittle" value={tittle} onChange={event=>{
        console.log(event.target.value);
        setTittle(event.target.value);
      }}/></p>
      <p><textarea name='body' placeholder='body' value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type='submit' value='Update'></input></p>
    </form>
  </article>
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId]= useState(4);
  const [topics, setTopics] = useState([
    {id:1, tittle:'html', body: 'html is ...'},
    {id:2, tittle:'css', body: 'css is ...'},
    {id:3, tittle:'javascript', body: 'javascript is ...'},
  ]);
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME'){
    content = <Article tittle="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let tittle, body = null;
    for(let i = 0; i<topics.length; i++){
      if(topics[i].id === id){
        tittle = topics[i].tittle;
        body = topics[i].body;
      }
    }
    content = <Article tittle={tittle} body={body}></Article>
    contextControl = <>
    <li><a href={'/update/' + id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics = [];
      for(let i=0; i<topics.length; i++){
        if(topics[i].id !== id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('WELCOME');
    }}></input></li>
    </>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_tittle,_body)=>{
        const newTopic = {id:nextId, tittle:_tittle, body:_body};
        const newTopics = [...topics]
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode('READ');
        setId(nextId);
        setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE'){
    let tittle, body = null;
    for(let i = 0; i<topics.length; i++){
      if(topics[i].id === id){
        tittle = topics[i].tittle;
        body = topics[i].body;
      }
    }
    content = <Update tittle={tittle} body={body} onUpdate={(tittle, body)=>{
      console.log(tittle,body);
      const newTopics = [...topics]
      const updateTopic = {id:id, tittle:tittle, body:body}
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updateTopic;
          break;
        }
      }
      setTopics (newTopics);
    }}></Update>
  }
  return (
    <div>
      <Header tittle="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li>
          <a href='/creat' onClick={event=>{
            event.preventDefault();
            setMode('CREATE');
          }}>Creat</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
