module.exports = {
  field: {
    rows: 4,
    columns: 6,
  },
  entity: {
    goldBag: {
      number: 1,
    },
    ghost: {
      number: 1,
    },
    monster: {
      number: 1,
      data: {
        isAlive: true,
      },
    },
  },
  hero: {
    position: {
      row: 0,
      column: 0,
    }
  }
}