import React, { Component } from 'react';
import { Card, Image, ButtonGroup, Button } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';

@inject('activityStore')
@observer
class ActivityDetails extends Component {
  componentWillMount() {
    const { activityStore, match } = this.props;
    activityStore.loadActivity(+match.params.id, true);
  }

  render() {
    const {
      history,
      activityStore: { activity, loading }
    } = this.props;
    if (loading)
      return (
        <LoadingComponent inverted={false} content={'Loading activity...'} />
      );
    return (
      <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>{activity.date}</span>
          </Card.Meta>
          <Card.Description>{activity.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <ButtonGroup widths={2}>
            <Button basic color='blue' as={Link} to={`/manage/${activity.id}`}>
              Edit
            </Button>
            <Button
              basic
              color='grey'
              onClick={() => history.push('/activities')}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Card.Content>
      </Card>
    );
  }
}

export default ActivityDetails;
