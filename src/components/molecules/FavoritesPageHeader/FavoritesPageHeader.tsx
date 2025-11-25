import Breadcrumbs from '@molecules/Breadcrumbs';
import PageTitle from '@atoms/PageTitle';
import './FavoritesPageHeader.scss';

type FavoritesPageHeaderProps = {
  favoritesCount: number;
};

const FavoritesPageHeader = ({ favoritesCount }: FavoritesPageHeaderProps) => {
  return (
    <div className="favorites-header">
      <Breadcrumbs />

      <PageTitle>Favorites</PageTitle>

      <span className="favorites-header__count">
        {favoritesCount} {favoritesCount === 1 ? 'item' : 'items'}
      </span>
    </div>
  );
};

export default FavoritesPageHeader;
