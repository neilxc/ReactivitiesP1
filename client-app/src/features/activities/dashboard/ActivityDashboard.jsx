import React, { Component } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { inject, observer } from 'mobx-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';

@inject('activityStore')
@observer
class ActivityDashboard extends Component {
  state = {
    loadingNext: false
  };

  componentDidMount() {
    this.props.activityStore.loadActivities();
  }

  handleGetNext = () => {
    const { page, loadActivities, setPage } = this.props.activityStore;
    this.setState({ loadingNext: true });
    setPage(page + 1);
    loadActivities().then(() => this.setState({ loadingNext: false }));
  };

  render() {
    const {
      activityStore: { loadingInitial, totalPages, page }
    } = this.props;
    return (
      <Grid>
        <GridColumn width={10}>
          {loadingInitial && page === 0 ? (
            <LoadingComponent
              inverted={true}
              content='Loading Activities...'
              style={{ marginTop: 40 }}
            />
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={this.handleGetNext}
              hasMore={!this.state.loadingNext && page + 1 < totalPages}
              initialLoad={false}
            >
              <ActivityList />
            </InfiniteScroll>
          )}
        </GridColumn>
        <GridColumn width={6}>
          <ActivityFilters />
        </GridColumn>
      </Grid>
    );
  }
}

export default ActivityDashboard;
