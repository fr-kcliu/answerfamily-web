import { makeSectionsFromParagraphs } from '../ArticleParagraphSections';

describe('makeSectionsFromParagraphs', () => {
  it('handles empty paragraphs', () => {
    const article = `P1
    P2
    P3`;
    const paragraphs = [];

    expect(makeSectionsFromParagraphs(article, paragraphs))
      .toMatchInlineSnapshot(`
Array [
  Object {
    "highlights": Array [],
    "paragraphs": Array [],
    "text": "P1",
  },
  Object {
    "highlights": Array [],
    "paragraphs": Array [],
    "text": "P2",
  },
  Object {
    "highlights": Array [],
    "paragraphs": Array [],
    "text": "P3",
  },
]
`);
  });

  it('matches searched paragraphs (with _highlight field) and sorts correctly', () => {
    const article =
      '台灣血液基金會，就是所謂的捐血中心，他們每年偽陽性的患者，就是說你的血液是沒有問題的，但是他檢測報告卻說，先生你的血液裡面有愛滋病，有梅毒，有B肝C肝，你不得捐血。' +
      '各位你們知道嗎，這種人數有多少嗎？每年大概有 2~3000 人。那我想請問，同樣的人員同樣的設備同樣的機器，你告訴我偽陰性，就是說今天他明明就是有愛滋、梅毒、B肝C肝帶原者的血液，' +
      '你今天告訴我偽陽性每年大概有 2000 多人，你告訴我偽陰性每年連一件都沒有，是 0。';

    const paragraphs = [
      {
        id: 'chmhpGgBdRnHeaV4n7mx',
        text:
          '同樣的人員同樣的設備同樣的機器，你告訴我偽陰性，就是說今天他明明就是有愛滋、梅毒、B肝C肝帶原者的血液，你今天告訴我偽陽性每年大概有 2000 多人，你告訴我偽陰性每年連一件都沒有，是 0',
        _highlight:
          '<HIGHLIGHT>同樣的人員同樣的設備同樣的機器</HIGHLIGHT>，<HIGHLIGHT>你告訴我偽陰性</HIGHLIGHT>，<HIGHLIGHT>就是說今天他明明就是有愛滋</HIGHLIGHT>、<HIGHLIGHT>梅毒</HIGHLIGHT>、<HIGHLIGHT>B</HIGHLIGHT><HIGHLIGHT>肝</HIGHLIGHT><HIGHLIGHT>C</HIGHLIGHT><HIGHLIGHT>肝帶原者的血液</HIGHLIGHT>，<HIGHLIGHT>你今天告訴我偽陽性每年大概有</HIGHLIGHT> <HIGHLIGHT>2000</HIGHLIGHT> <HIGHLIGHT>多人</HIGHLIGHT>，<HIGHLIGHT>你告訴我偽陰性每年連一件都沒有</HIGHLIGHT>，<HIGHLIGHT>是</HIGHLIGHT> <HIGHLIGHT>0</HIGHLIGHT>',
      },
      {
        id: 'ehndpGgBdRnHeaV4vLnG',
        text: '您的家人曾經因輸血而造成愛滋梅毒B肝C肝',
        _highlight:
          '您的家人曾經因輸血而造成<HIGHLIGHT>愛滋梅毒</HIGHLIGHT><HIGHLIGHT>B</HIGHLIGHT><HIGHLIGHT>肝</HIGHLIGHT><HIGHLIGHT>C</HIGHLIGHT><HIGHLIGHT>肝</HIGHLIGHT>',
      },
      {
        id: 'cRmapGgBdRnHeaV4kLke',
        text:
          '最強最厲害的檢測，最有經驗的，同樣也是用核酸檢測法的美國跟日本，都有因為偽陰性愛滋病血液流傳到醫院，而造成死亡的案例。',
        _highlight:
          '最強最厲害的<HIGHLIGHT>檢測</HIGHLIGHT>，最有經驗的，<HIGHLIGHT>同樣也是用核酸檢測</HIGHLIGHT>法的美國跟日本，都有因為<HIGHLIGHT>偽陰性愛滋病血液</HIGHLIGHT>流傳到醫院，而造成死亡的案例。',
      },
      {
        id: 'eBncpGgBdRnHeaV4m7lb',
        text: '全台灣曾經因為捐血而受害的偽陽性受害者',
        _highlight:
          '全<HIGHLIGHT>台灣曾經因為捐血而受害的偽陽性</HIGHLIGHT>受害者',
      },
      {
        id: 'bBlTpGgBdRnHeaV4Irl9',
        text:
          '血液基金會的財務報表沒有公開透明是魔鬼藏身之處！每年販售民眾的捐血給醫院的收入達30億元',
        _highlight:
          '<HIGHLIGHT>血液基金會的財務報表沒有</HIGHLIGHT>公開透明是魔鬼藏身之處！<HIGHLIGHT>每年販售民眾的捐血</HIGHLIGHT>給醫院的收入達30億元',
      },
      {
        id: 'dRnHpGgBdRnHeaV4eLmR',
        text:
          '同樣的核酸檢測法，在美國、在日本，都發生過因為愛愛滋捐血而造成死亡案件',
        _highlight:
          '<HIGHLIGHT>同樣的核酸檢測</HIGHLIGHT>法，在美國、在日本，都發生過因為愛<HIGHLIGHT>愛滋捐血</HIGHLIGHT>而造成死亡案件',
      },
    ];

    expect(makeSectionsFromParagraphs(article, paragraphs)).toMatchSnapshot();
  });

  it('matches article paragraphs (no _highlight field, use paragraph text)', () => {
    const article =
      '台灣血液基金會，就是所謂的捐血中心，他們每年偽陽性的患者，就是說你的血液是沒有問題的，但是他檢測報告卻說，先生你的血液裡面有愛滋病，有梅毒，有B肝C肝，你不得捐血。' +
      '各位你們知道嗎，這種人數有多少嗎？每年大概有 2~3000 人。那我想請問，同樣的人員同樣的設備同樣的機器，你告訴我偽陰性，就是說今天他明明就是有愛滋、梅毒、B肝C肝帶原者的血液，' +
      '你今天告訴我偽陽性每年大概有 2000 多人，你告訴我偽陰性每年連一件都沒有，是 0。';

    const paragraphs = [
      {
        id: 'chmhpGgBdRnHeaV4n7mx',
        text:
          '同樣的人員同樣的設備同樣的機器，你告訴我偽陰性，就是說今天他明明就是有愛滋、梅毒、B肝C肝帶原者的血液，你今天告訴我偽陽性每年大概有 2000 多人，你告訴我偽陰性每年連一件都沒有，是 0',
      },
    ];

    expect(makeSectionsFromParagraphs(article, paragraphs)).toMatchSnapshot();
  });
});
