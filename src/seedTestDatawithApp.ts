import { DiscountService } from './m-discount/discount.service';

export const seedTestDatawithApp = async (app) => {
  const disService = app.get(DiscountService);
  // create some categories
  const categories = await Promise.all([
    disService.createCat({
      name: 'cat1',
      discount: 10,
    }),
    disService.createCat({
      name: 'cat2',
      discount: 20,
    }),
    disService.createCat({
      name: 'cat3',
    }),
  ]);
  // cat3 needs a parent category >>
  await Promise.all([
    (async () => {
      const cat2 = await disService.getCatByName('cat2');
      const cat3 = await disService.getCatByName('cat3');
      cat3.parent_cat = cat2.id;
      cat3.save();
    })(),
  ]);
  // create some products
  const products = await Promise.all([
    disService.createProduct({
      name: 'prod1',
      discount: 2,
      parent_cat: categories[0].id,
    }),
    disService.createProduct({
      name: 'prod2',
      parent_cat: categories[0].id,
    }),
    disService.createProduct({
      name: 'prod3',
      parent_cat: categories[2].id,
    }),
  ]);
  return products;
};
