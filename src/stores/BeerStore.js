import AjaxObservable from 'rxjs/observable/dom/AjaxObservable';

class BeerStore {
  topRecipes() {
    let source = AjaxObservable({url: '/api/top-recipes', method: 'GET'});
    return source.share();
  }
}

const beerStore = new BeerStore();

export default beerStore;
