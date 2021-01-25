import * as mobx from 'mobx'

export default class DashboardVM {
  widgets = ['one', 'two'].map((widget) => {
    return {
      id: widget,
      title: `Widget ${widget}`,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At sapiente minus pariatur beatae incidunt dolor nam laborum magni obcaecati culpa. Nemo possimus molestiae saepe cumque quisquam optio mollitia magni quia?',
    }
  })

  superHeroes = [
    {id: 'superman', name: 'Super Man', power: 'Man of steel'},
    {id: 'spiderman', name: 'Spider Man', power: 'Spider web'},
    {id: 'logan', name: 'Wolverine', power: 'Regeneration'},
  ]

  highlightedHeroId = 'logan'

  constructor() {
    mobx.makeAutoObservable(this, undefined, {deep: false, autoBind: true})
  }
}
