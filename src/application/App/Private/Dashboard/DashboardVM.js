import * as mobx from 'mobx'

const {observable} = mobx

export default class DashboardVM {
  @observable.ref widgets = ['one', 'two'].map((widget) => {
    return {
      id: widget,
      title: `Widget ${widget}`,
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At sapiente minus pariatur beatae incidunt dolor nam laborum magni obcaecati culpa. Nemo possimus molestiae saepe cumque quisquam optio mollitia magni quia?',
    }
  })
}
