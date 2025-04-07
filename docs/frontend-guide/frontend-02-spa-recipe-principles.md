# A Frontend SPA Recipe

What follows is a single page app (SPA) recipe that is continously evolving by keeping in mind the ["Keep it Simple, Stupid principle" (KISS)](https://en.wikipedia.org/wiki/KISS_principle).

## The Recipe Ingredients

1. **React + Mobx**. "Pure" Mobx is used, mainly for simplicity and flexibility.  
   (There are opiniated solutions like [Mobx State Tree](https://mobx-state-tree.js.org/intro/philosophy)).

2. **3 principles** influence the frontend architecture itself (not just react / mobx):

- [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Robert C. Martin (Uncle Bob)
- [Decouple state and UI article](https://hackernoon.com/how-to-decouple-state-and-ui-a-k-a-you-dont-need-componentwillmount-cc90b787aa37) by Michel Weststrate (Mobx creator)
- [App shell architecture](https://developers.google.com/web/fundamentals/architecture/app-shell) on developers.google.com.

3. **Building a UI Framework**.  
   The framework encapsulates all the reusable styles and UI components, boosting consistency and productivity.

I recommend to have a look at these links in your "free time" if such thing exists for a developer ;)

---

[Next: "The Mobx / React combo"](frontend-03-1-intro_mobx-react.md)
