import CurrencyConverter from './components/CurrencyConverter';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4">
      <div className="container mx-auto">
        <CurrencyConverter />
      </div>
    </main>
  );
}
