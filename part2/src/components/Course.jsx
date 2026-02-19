import Header from './Header'
import Content from './Content'

const Course = (props) => (
  <div>
    <Header course={props.course.name} />
    <Content parts={props.course.parts} />
  </div>
)

export default Course