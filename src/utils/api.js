const annotations = [
	{ title: 'Annotation 1', description: ' bla bla'},
	{ title: 'Annotation 2', description: ' bla bla'},
	{ title: 'Annotation 3', description: ' bla bla'},
	{ title: 'Annotation 4', description: ' bla bla'}
]

export default () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(annotations)
    }, 3000)
  })
}