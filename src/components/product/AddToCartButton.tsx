'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product, SizeOption } from '@/types';

type Props = { product: Product };

export default function AddToCartButton({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<SizeOption['label'] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState('');
  const [added, setAdded] = useState(false);

  const selectedSizeInfo = product.sizes.find((s) => s.label === selectedSize);
  const isSoldOut = selectedSizeInfo ? selectedSizeInfo.stock === 0 : false;
  const isCustom = product.category === 'custom';

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* 사이즈 선택 */}
      <div>
        <p className="font-korean text-xs tracking-widest text-ink-soft uppercase mb-3">
          사이즈 선택
        </p>
        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size.label)}
              disabled={size.stock === 0}
              className={`w-14 h-14 flex flex-col items-center justify-center border transition-all text-xs
                ${selectedSize === size.label
                  ? 'border-ink bg-ink text-cream'
                  : size.stock === 0
                  ? 'border-line text-line cursor-not-allowed'
                  : 'border-line text-ink hover:border-ink'
                }`}
            >
              <span className="font-display text-base">{size.label}</span>
              <span className="font-body text-[10px]">{size.wrist_cm}cm</span>
            </button>
          ))}
        </div>
        <Link href="/guide/size" className="font-body text-xs text-ink-soft hover:text-ink transition-colors mt-2 inline-block">
          사이즈 측정 방법 →
        </Link>
      </div>

      {/* 각인 텍스트 (custom 카테고리만) */}
      {isCustom && (
        <div>
          <label className="font-korean text-xs tracking-widest text-ink-soft uppercase block mb-3">
            각인 텍스트 (최대 6글자)
          </label>
          <input
            type="text"
            maxLength={6}
            value={engraving}
            onChange={(e) => setEngraving(e.target.value)}
            placeholder="각인할 이름이나 단어"
            className="w-full border border-line bg-cream px-4 py-3 font-body text-sm text-ink focus:outline-none focus:border-ink transition-colors"
          />
          <p className="font-body text-xs text-ink-soft mt-1">{engraving.length} / 6</p>
        </div>
      )}

      {/* 수량 선택 */}
      <div className="flex items-center gap-4">
        <p className="font-korean text-xs tracking-widest text-ink-soft uppercase">수량</p>
        <div className="flex items-center border border-line">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center font-display text-ink hover:bg-cream-deep transition-colors"
          >
            −
          </button>
          <span className="w-10 text-center font-display text-sm text-ink">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(selectedSizeInfo?.stock ?? 1, quantity + 1))}
            className="w-10 h-10 flex items-center justify-center font-display text-ink hover:bg-cream-deep transition-colors"
          >
            +
          </button>
        </div>
        {selectedSizeInfo && (
          <p className="font-body text-xs text-ink-soft">
            재고 {selectedSizeInfo.stock}개
          </p>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || isSoldOut}
          className={`flex-1 py-4 font-body text-sm tracking-widest transition-all
            ${!selectedSize || isSoldOut
              ? 'bg-line text-ink-soft cursor-not-allowed'
              : added
              ? 'bg-sage text-cream'
              : 'bg-ink text-cream hover:bg-ink-soft'
            }`}
        >
          {isSoldOut ? '품절' : added ? '담겼어요' : '장바구니 담기'}
        </button>
        <button
          disabled={!selectedSize || isSoldOut}
          className={`flex-1 py-4 font-body text-sm tracking-widest border transition-all
            ${!selectedSize || isSoldOut
              ? 'border-line text-line cursor-not-allowed'
              : 'border-ink text-ink hover:bg-ink hover:text-cream'
            }`}
        >
          바로 구매
        </button>
      </div>
    </div>
  );
}

