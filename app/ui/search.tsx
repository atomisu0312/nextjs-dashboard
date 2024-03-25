'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // この３つはセットで考えよう
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  // useDebouncedCallbackを使うことにより、入力が落ち着いたら操作が実行される
  const handleSearch= useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams); // マップを継承した何か
    // termの更新によって自動でマップが更新される
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // onChangeとはいえ、タイピングが終了したら問い合わせを開始するくらいがちょうどいい 
    console.log(params); // 入力するたびに問い合わせるのはアホすぎひん？
    replace(`${pathname}?${params.toString()}`); // URLが勝手に変わる
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        // stateでインプット結果を管理している場合には、defaultValueではなくvalueを渡しましょう
        defaultValue={searchParams.get('query')?.toString()} // URLに表示されているクエリとインプットを連携する 
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
