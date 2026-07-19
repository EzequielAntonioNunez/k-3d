import { useTranslation } from 'react-i18next'

const ITEMS = ['waterBottle', 'travelTumbler', 'activeTumbler']

export const ProductList = () => {
  const { t } = useTranslation()

  return (
    <ul className="hero__products" aria-label={t('products.ariaLabel')}>
      {ITEMS.map((key) => (
        <li className="product-item" key={key}>
          <h2 className="product-item__name">{t(`products.${key}.name`)}</h2>
          <p className="product-item__sub">{t(`products.${key}.sub`)}</p>
        </li>
      ))}
    </ul>
  )
}
