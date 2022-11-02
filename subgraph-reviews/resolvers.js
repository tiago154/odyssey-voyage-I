const resolvers = {
  Query: {
    latestReviews: (_, __, { dataSources }) => {
      return dataSources.reviewsAPI.getLatestReviews();
    }
  },
  Review: {
    location: ({ locationId: id }) => ({ id })
  },
  Location: {
    overallRating: ({ id }, _, { dataSources }) => dataSources.reviewsAPI.getOverallRatingForLocation(id),
    reviewsForLocation: ({ id }, _, { dataSources }) => dataSources.reviewsAPI.getReviewsForLocation(id)
  },
  Mutation: {
    submitReview: (_, { locationReview }, { dataSources }) => {
      const newReview = dataSources.reviewsAPI.submitReviewForLocation(locationReview);
      return { code: 200, success: true, message: 'success', locationReview: newReview };
    }
  }
};

module.exports = resolvers;
