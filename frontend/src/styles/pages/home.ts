import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;

  h1{
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
    margin-top: 40px;
  }

  p{
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
  }

`

export const ListContainer = styled(Container)`
  width: auto;
  height: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: flex-start;
  gap: 3em;

  fieldset{
    padding: 1em;

    legend{
      width: auto;
      margin-left: auto;
      margin-right: auto;
    }
  }

`
