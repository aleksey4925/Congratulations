import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import moment from 'moment';

import { Home, StepOne, StepTwo, StepThree, StepFour } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

import './App.css'

const APP_ID = 51991455;

export const App = () => {
  const defaultDate = moment().add(1, 'days').hour(8).minute(30);

  const [popout, setPopout] = useState(null);
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();

  const [mode, setMode] = useState('input');
  const [communities, setCommunities] = useState([]);
  const [communityId, setCommunityId] = useState('');
  const [date, setDate] = useState(defaultDate.format('YYYY-MM-DD'));
  const [hours, setHours] = useState(defaultDate.hour());
  const [minutes, setMinutes] = useState(defaultDate.minute());
  const [greetings, setGreetings] = useState([]);
  const [selectedGreeting, setSelectedGreeting] = useState('');
  const [birthdayMembers, setBirthdayMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [birthdayMembersText, setBirthdayMembersText] = useState('');

  useEffect(() => {
    if (mode === 'select') {
      setPopout(<ScreenSpinner size="large" />);
      async function fetchCommunities() {
        const tokenResponse = await bridge.send('VKWebAppGetAuthToken', {
          app_id: APP_ID,
          scope: 'groups'
        });

        const {response} = await bridge.send('VKWebAppCallAPIMethod', {
          method: 'groups.get',
          request_id: 'getGroups',
          params: {
            extended: 1,
            filter: 'admin',
            v: '5.199',
            access_token: tokenResponse.access_token
          },
        });

        const openGroups = response.items.filter(item => !item.is_closed)
        setCommunities(openGroups);

        setPopout(null);
      }

      fetchCommunities();
    }
  }, [mode]);

  function setDefaults() {
      setMode('input');
      setCommunities([]);
      setCommunityId('');
      setDate(defaultDate.format('YYYY-MM-DD'));
      setHours(defaultDate.hour());
      setMinutes(defaultDate.minute());
      setGreetings([]);
      setSelectedGreeting('');
      setBirthdayMembers([]);
      setSelectedMembers(new Set());
      setBirthdayMembersText('');
  }

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id={DEFAULT_VIEW_PANELS.HOME} />
          <StepOne id={DEFAULT_VIEW_PANELS.STEP_ONE} mode={mode} communities={communities} communityId={communityId} setMode={setMode} setCommunityId={setCommunityId} />
          <StepTwo id={DEFAULT_VIEW_PANELS.STEP_TWO} date={date} hours={hours} minutes={minutes} setDate={setDate} setHours={setHours} setMinutes={setMinutes}/>
          <StepThree id={DEFAULT_VIEW_PANELS.STEP_THREE} greetings={greetings} selectedGreeting={selectedGreeting} setGreetings={setGreetings} setSelectedGreeting={setSelectedGreeting}/>
          <StepFour id={DEFAULT_VIEW_PANELS.STEP_FOUR} setPopout={setPopout} setDefaults={setDefaults} communityId={communityId} date={date} hours={hours} minutes={minutes} birthdayMembers={birthdayMembers} selectedMembers={selectedMembers} setBirthdayMembers={setBirthdayMembers} setSelectedMembers={setSelectedMembers} selectedGreeting={selectedGreeting} birthdayMembersText={birthdayMembersText} setBirthdayMembersText={setBirthdayMembersText}/>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
