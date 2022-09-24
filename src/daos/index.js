let stellarDao

    const { default: StellarDao } =  await import('../daos/stellar/StellarDao.js')
    stellarDao = new StellarDao();

export { stellarDao }
