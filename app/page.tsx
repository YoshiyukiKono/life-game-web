'use client';

import { useEffect, useState } from 'react';
import { supabase, type Choice } from './supabase';

export default function Home() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [choices, setChoices] = useState<Choice[]>([]);
  const [status, setStatus] = useState('');

  async function loadChoices() {
    const { data, error } = await supabase
      .from('choices')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      setStatus(`読み込みエラー: ${error.message}`);
      return;
    }
    setChoices(data ?? []);
  }

  useEffect(() => {
    loadChoices();
  }, []);

  async function submitChoice(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('保存中...');

    const worldlineNote = title
      ? `この選択は、まだ小さな分岐として記録された。意味はあとから追いついてくる。`
      : null;

    const { error } = await supabase.from('choices').insert({
      title,
      body,
      worldline_note: worldlineNote
    });

    if (error) {
      setStatus(`保存エラー: ${error.message}`);
      return;
    }

    setTitle('');
    setBody('');
    setStatus('保存しました。');
    await loadChoices();
  }

  return (
    <main>
      <p className="small">anonymous-life-game / weekend MVP</p>
      <h1>日記は歴史</h1>
      <p>
        今日の選択をひとつ記録する。結論は出さない。選択だけが残り、あとから歴史になる。
      </p>

      <form onSubmit={submitChoice}>
        <label htmlFor="title">今日の選択</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="例: 週末にWeb版の最小プロトタイプを作る"
          required
        />

        <label htmlFor="body">メモ</label>
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="なぜその選択をしたのか。迷い、期待、偶然など。"
        />

        <button type="submit">記録する</button>
        {status && <p className="small">{status}</p>}
      </form>

      <section>
        <h2>選択履歴</h2>
        <div className="list">
          {choices.map((choice) => (
            <article className="card" key={choice.id}>
              <p className="small">{new Date(choice.created_at).toLocaleString('ja-JP')}</p>
              <h3>{choice.title}</h3>
              {choice.body && <p>{choice.body}</p>}
              {choice.worldline_note && <p className="small">{choice.worldline_note}</p>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
