export const AnswerForm = () => {
  return (
    <form>
      <fieldset>
        <legend>Answers</legend>

        <div>
          <input type='text' name='answer1' />
          <input type='radio' name='correctAnswer' />
        </div>

        <div>
          <input type='text' name='answer2' />
          <input type='radio' name='correctAnswer' />
        </div>

        <div>
          <input type='text' name='answer3' />
          <input type='radio' name='correctAnswer' />
        </div>

        <div>
          <input type='text' name='answer4' />
          <input type='radio' name='correctAnswer' />
        </div>
      </fieldset>
      {/* <div>
        <label htmlFor='answer1'>Answer: </label>
        <input type='text' id='answer1' name='answer1' />
        <input type='checkbox' name='correctAnswer' />
      </div>

      <div>
        <label htmlFor='answer2'>Answer: </label>
        <input type='text' id='answer2' name='answer2' />
        <input type='checkbox' name='correctAnswer' />
      </div>

      <div>
        <label htmlFor='answer3'>Answer: </label>
        <input type='text' id='answer3' name='answer3' />
        <input type='checkbox' name='correctAnswer' />
      </div>

      <div>
        <label htmlFor='answer4'>Answer: </label>
        <input type='text' id='answer4' name='answer4' />
        <input type='checkbox' name='correctAnswer' />
      </div> */}
    </form>
  )
}
