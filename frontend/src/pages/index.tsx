import Head from 'next/head'

import Walter from '../assets/walter.svg'
import { Container } from '../styles/pages/home'

const Home: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Template Repo</title>
      </Head>

      <Walter/>
      <h1>NextJS and NodeJS simple structure</h1>
      <p>
        A NextJS + NodeJS template with integrated styled-components,
        {' '}typescript and eslint
      </p>

    </Container>
  )
}

export default Home
