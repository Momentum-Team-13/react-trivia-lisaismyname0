
export default function TriviaPage(props){
    console.log(props)
    let trivia = props
    return(
        <div>
            <p>{trivia}</p>
        </div>
    )
}