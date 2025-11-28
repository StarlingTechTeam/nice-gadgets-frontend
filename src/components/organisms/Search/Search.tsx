/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import Icon from '@/components/atoms/Icon';
import SearchIcon from '@assets/icons/search-icon.svg';
import CloseIcon from '@assets/icons/close-icon.svg';
import { useSearch } from '@hooks/useSearch';
import type { ProductDetails } from '@/types/ProductDetails';

import SearchResults from '@molecules/SearchResults/SearchResults';
import './Search.scss';

interface SearchProps {
  isMobile: boolean;
  isOverlay?: boolean;
  menuOpen?: boolean;
  expanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
}

const Search: React.FC<SearchProps> = ({
  isMobile,
  isOverlay = false,
  menuOpen = false,
  expanded = false,
  setExpanded,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState('');

  const { results, loading } = useSearch(value);

  // Reset on route change
  useEffect(() => {
    setValue('');
    setExpanded?.(false);
  }, [location.pathname, setExpanded]);

  // Auto focus on tablet
  useEffect(() => {
    if ((expanded && setExpanded) || (isOverlay && menuOpen)) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [expanded, menuOpen, isOverlay, setExpanded]);

  // Escape clears & closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setValue('');
        setExpanded?.(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setExpanded]);

  // Click outside closes
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setValue('');
        setExpanded?.(false);
      }
    };
    if ((expanded && setExpanded) || (isOverlay && menuOpen)) {
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);
    }
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [expanded, isOverlay, menuOpen, setExpanded]);

  // Select product
  const handleSelect = (p: ProductDetails) => {
    setValue('');
    setExpanded?.(false);
    navigate(`/${p.category}/${p.id}`);
  };

  // ---------------- MOBILE OVERLAY ----------------
  if (isOverlay) {
    return (
      <div
        ref={wrapperRef}
        className="mobile-search-overlay"
      >
        <div className="search__input-box">
          <Icon src={SearchIcon} />
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search…"
            className="mobile-search__input"
          />
          {value && (
            <button
              type="button"
              className="search__clear-btn"
              onClick={() => setValue('')}
            >
              <Icon src={CloseIcon} />
            </button>
          )}
        </div>

        {value && (
          <SearchResults
            results={results}
            loading={loading}
            onSelect={handleSelect}
          />
        )}
      </div>
    );
  }

  // ---------------- TABLET TOGGLE ----------------
  if (setExpanded) {
    return (
      <div
        ref={wrapperRef}
        className={classNames('search search--toggle', {
          'is-expanded': expanded,
        })}
      >
        {!expanded && (
          <button
            type="button"
            className="search__toggle-btn icon-btn"
            onClick={() => setExpanded(true)}
          >
            <Icon src={SearchIcon} />
          </button>
        )}

        {expanded && (
          <div className="search__input-box">
            <Icon src={SearchIcon} />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search…"
              className="search__input"
            />
            {value && (
              <button
                type="button"
                className="search__clear-btn"
                onClick={() => setValue('')}
              >
                <Icon src={CloseIcon} />
              </button>
            )}

            {value && (
              <SearchResults
                results={results}
                loading={loading}
                onSelect={handleSelect}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  // ---------------- DESKTOP ----------------
  return (
    <div
      ref={wrapperRef}
      className="search"
    >
      <div className="search__input-box">
        <Icon src={SearchIcon} />
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search…"
          className="search__input"
        />
        {value && (
          <button
            type="button"
            className="search__clear-btn"
            onClick={() => setValue('')}
          >
            <Icon src={CloseIcon} />
          </button>
        )}
      </div>

      {value && (
        <SearchResults
          results={results}
          loading={loading}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default Search;
