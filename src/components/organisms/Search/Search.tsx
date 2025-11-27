/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Icon from '@/components/atoms/Icon';
import SearchIcon from '@assets/icons/search-icon.svg';
import CloseIcon from '@assets/icons/close-icon.svg';
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

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('');
    setExpanded?.(false);
  }, [location.pathname, setExpanded]);

  useEffect(() => {
    if (expanded && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [expanded, menuOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setValue('');
        setExpanded?.(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setExpanded]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setValue('');
        setExpanded?.(false);
      }
    };

    if (expanded || (isOverlay && menuOpen)) {
      document.addEventListener('mousedown', handleOutside);
      document.addEventListener('touchstart', handleOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [expanded, isOverlay, menuOpen, setExpanded]);

  if (isOverlay) {
    return (
      <div
        ref={wrapperRef}
        className="mobile-search"
      >
        <div className="mobile-search__box">
          <Icon src={SearchIcon} />
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mobile-search__input"
            placeholder="Search…"
            aria-label="Search on mobile"
          />
          {value && (
            <button
              type="button"
              className="mobile-search__clear"
              onClick={() => setValue('')}
              aria-label="Clear search"
            >
              <Icon src={CloseIcon} />
            </button>
          )}
        </div>
      </div>
    );
  }

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
            className="icon-btn search__toggle-btn"
            aria-label="Open search"
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
              className="search__input"
              placeholder="Search…"
              aria-label="Search products"
            />
            {value && (
              <button
                type="button"
                className="search__clear-btn"
                onClick={() => setValue('')}
                aria-label="Clear search"
              >
                <Icon src={CloseIcon} />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

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
          className="search__input"
          placeholder="Search…"
          aria-label="Search products"
        />
        {value && (
          <button
            type="button"
            className="search__clear-btn"
            onClick={() => setValue('')}
            aria-label="Clear search"
          >
            <Icon src={CloseIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
