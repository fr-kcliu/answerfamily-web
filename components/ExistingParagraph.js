import { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const NEW_REPLY = gql`
  mutation($paragraphId: String!, $reply: ReplyInput!) {
    addReplyToParagraph(paragraphId: $paragraphId, reply: $reply) {
      paragraphReplies {
        createdAt
        reply {
          id
          text
          createdAt
        }
      }
    }
  }
`;

function NewReplyForm() {
  return <Mutation mutation={NEW_REPLY}>{}</Mutation>;
}

const CONNECT_RPELY = gql`
  mutation($replyId: String!, $paragraphId: String!) ){
    connectReplyWithParagraph(replyId: $replyId, paragraphId: $paragraphId) {
      paragraphReplies {
        createdAt
        reply {
          id
          text
          createdAt
        }
      }
    }
  }`;

function ConnectReplyButton({ replyId, paragraphId }) {
  return (
    <Mutation mutation={CONNECT_RPELY}>
      {(connectReply, { loading }) => (
        <button
          onClick={() => connectReply({ variables: { replyId, paragraphId } })}
          disabled={loading}
        >
          使用此回應
        </button>
      )}
    </Mutation>
  );
}

const SUGGEST_REPLY = gql`
  query($text: String) {
    paragraphs(filter: { inText: $text }) {
      id
      text
      paragraphReplies {
        createdAt
        reply {
          id
          text
          createdAt
        }
      }
    }
  }
`;

const SEARCH_REPLY = gql`
  query($text: String) {
    paragraphs(filter: { contains: $text }) {
      id
      text
      paragraphReplies {
        createdAt
        reply {
          id
          text
          createdAt
        }
      }
    }
  }
`;

class ExistingReplyForm extends Component {
  static defaultProps = {
    paragraph: null, // Should be object
    selectedReplyIds: [],
  };

  state = { searchedText: '' };

  render() {
    const { paragraph } = this.props;
    const { searchedText } = this.state;

    return (
      <div>
        <input type="search" value={searchedText} />
        <hr />
        {searchedText ? (
          <Query query={SEARCH_REPLY} variables={{ text: searchedText }}>
            {(data, loading) => {
              if (loading) return <p>Loading</p>;
              // const replyId = ;
              return <p>{JSON.stringify(data)}</p>;
            }}
          </Query>
        ) : (
          <Query query={SUGGEST_REPLY} variables={{ text: paragraph.text }}>
            {(data, loading) => {
              if (loading) return <p>Loading</p>;

              return <p>{JSON.stringify(data)}</p>;
            }}
          </Query>
        )}
      </div>
    );
  }
}

class ExistingParagraph extends Component {
  static defaultProps = {
    paragraph: null, // should be an object
    onDelete() {},
  };

  state = {
    tab: 0,
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  handleDelete = () => {
    const { paragraph, deleteParagraph } = this.props;
    deleteParagraph({ variables: { paragraphId: paragraph.id } });
  };

  render() {
    const { paragraph } = this.props;
    const { tab } = this.state;
    return (
      <div>
        <button type="button" onClick={this.handleDelete}>
          Delete
        </button>
        {paragraph.text}
        <hr />
        <Tabs onChange={this.handleTabChange} value={tab}>
          <Tab label="寫新的回應" />
          <Tab label="用舊的回應" />
        </Tabs>
        {tab === 0 && <NewReplyForm />}
        {tab === 1 && <ExistingReplyForm paragraph={paragraph} />}
      </div>
    );
  }
}

export default ExistingParagraph;
