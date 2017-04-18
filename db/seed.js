'use strict'

const db = require('APP/db')
  , { User, Thing, Favorite, Category, Product, Order, Review, Item, Promise } = db
  , { mapValues } = require('lodash')

function seedEverything() {
  const seeded = {
    users: users(),
    // things: things(),
    categories: categories(),

  }

  seeded.products = products(seeded)
  seeded.orders = orders(seeded)
  seeded.items = items(seeded)
  seeded.reviews = reviews(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  ruth: {
    email: 'ruth@email.com',
    name: 'Ruth',
    password: '1234',
    accountType: 'user',
    streetAddress: '123 Anywhere St',
    city: 'New York',
    state: 'NY',
    zip: '10036',
    cardNumber: '1234567890',
    expMonth: '01',
    expYear: '2017',
    cardType: 'Visa',
    cvv: '123',
  },
  guest: {
    email: 'guest@email.com',
    accountType: 'guest'
  },
})

// const things = seed(Thing, {
//   surfing: { name: 'surfing' },
//   smiting: { name: 'smiting' },
//   puppies: { name: 'puppies' },
// })


const categories = seed(Category, {
  mars: {
    name: 'Mars',
    image: '/assets/images/mars.jpg',
  }
})

const products = seed(Product,

  ({ categories }) => ({

    marsHotel: {
      category_id: categories.mars.id,

      title: 'Mars Hotel',
      description: 'some description',
      price: 399,
      image: '/assets/images/mars-hotel-1.jpg',
      invQty: 5
    }
  })
)

const orders = seed(Order, ({users}) => ({
  order1: {
    status: 'completed',
    user_id: users.ruth.id
  },
  order2: {
    status: 'pending',
    user_id: users.guest.id
  }
})
)

const items = seed(Item,

  ({ orders, products }) => ({

    marsHotelItem: {
      order_id: orders.order1.id,
      product_id: products.marsHotel.id,
      price: products.marsHotel.price,
      qty: 1
    }
  })
)

const reviews = seed(Review,

  ({ products, users }) => ({

    marsHotelReview1: {
      user_id: users.ruth.id,
      product_id: products.marsHotel.id,
      starRating: '4',
      text: 'this hotel was awesome'
    }
  })
)

// const favorites = seed(Favorite,
//   // We're specifying a function here, rather than just a rows object.
//   // Using a function lets us receive the previously-seeded rows (the seed
//   // function does this wiring for us).
//   //
//   // This lets us reference previously-created rows in order to create the join
//   // rows. We can reference them by the names we used above (which is why we used
//   // Objects above, rather than just arrays).
//   ({ users, things }) => ({
//     // The easiest way to seed associations seems to be to just create rows
//     // in the join table.
//     'obama loves surfing': {
//       user_id: users.barack.id,    // users.barack is an instance of the User model
//       // that we created in the user seed above.
//       // The seed function wires the promises so that it'll
//       // have been created already.
//       thing_id: things.surfing.id  // Same thing for things.
//     },
//     'god is into smiting': {
//       user_id: users.god.id,
//       thing_id: things.smiting.id
//     },
//     'obama loves puppies': {
//       user_id: users.barack.id,
//       thing_id: things.puppies.id
//     },
//     'god loves puppies': {
//       user_id: users.god.id,
//       thing_id: things.puppies.id
//     },
//   })
// )

if (module === require.main) {
  db.didSync
    .then(() => db.sync({ force: true }))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others = {}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
          (all, one) => Object.assign({}, all, { [one.key]: one.value }),
          {}
          )
      )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, { users, categories })
