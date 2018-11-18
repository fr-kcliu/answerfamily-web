import App from '../components/App';
import Header from '../components/Header';
import Submit from '../components/Submit';
import PostList from '../components/PostList';

export default function IndexPage() {
  return (
    <App>
      <Header />
      <Submit />
      <PostList />
    </App>
  );
}