import React from 'react';
import { LoggedDamageEntry } from '../types';
import LogCard from './LogCard'; // LogCardコンポーネントをインポート
import { FileText, Trash } from 'lucide-react';

interface HistoryTabProps {
  loggedEntries: LoggedDamageEntry[];
  onDeleteLog: (logId: string) => void;
  onClearAllLogs: () => void;
}

const HistoryTab: React.FC<HistoryTabProps> = ({ loggedEntries, onDeleteLog, onClearAllLogs }) => {
  if (!loggedEntries || loggedEntries.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        <FileText size={48} className="mx-auto mb-4 opacity-50" />
        <p className="text-xl">計算履歴はありません。</p>
        <p className="text-sm mt-2">ダメージ計算結果の詳細画面から「ログ保存」ボタンを押すと、ここに履歴が追加されます。</p>
      </div>
    );
  }

  // タイムスタンプの降順（新しいものが上）にソート
  const sortedEntries = [...loggedEntries].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="p-2 md:p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">計算履歴</h2>
        {loggedEntries.length > 0 && (
            <button
                onClick={() => {
                    if (window.confirm(`${loggedEntries.length}件のログをすべて削除しますか？この操作は元に戻せません。`)) {
                        onClearAllLogs();
                    }
                }}
                className="flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors"
                aria-label="すべてのログを削除"
            >
                <Trash size={16} className="mr-1.5" />
                すべて削除
            </button>
        )}
      </div>
      <div className="space-y-4">
        {sortedEntries.map(entry => (
          <LogCard
            key={entry.id}
            logEntry={entry}
            onDelete={onDeleteLog}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryTab;