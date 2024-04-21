export async function mapIndexSetObjectToUpdateDto (indexSet) {
  return {
    shards: indexSet?.shards,
    index_optimization_max_num_segments:
      indexSet?.index_optimization_max_num_segments,
    replicas: indexSet?.replicas,
    rotation_strategy: indexSet['rotation_strategy'],
    field_type_refresh_interval: indexSet?.field_type_refresh_interval,
    description: indexSet?.description,
    index_optimization_disabled: indexSet?.index_optimization_disabled,
    rotation_strategy_class: indexSet?.rotation_strategy_class,
    title: indexSet?.title,
    retention_strategy_class: indexSet?.retention_strategy_class,
    retention_strategy: indexSet['retention_strategy'],
    writable: indexSet?.writable
  };
};

export async function mapIndexSetObjectToDto (indexSet) {
  return {
    index_optimization_max_num_segments:
      indexSet?.index_optimization_max_num_segments,
    replicas: indexSet?.replicas,
    field_type_refresh_interval: indexSet?.field_type_refresh_interval,
    description: indexSet?.description,
    index_optimization_disabled: indexSet?.index_optimization_disabled,
    can_be_default: indexSet?.can_be_default,
    creation_date: indexSet?.creation_date,
    title: indexSet?.title,
    retention_strategy_class: indexSet?.retention_strategy_class,
    retention_strategy: indexSet['retention_strategy'],
    writable: indexSet?.writable,
    shards: indexSet?.shards,
    default: indexSet?.default,
    index_analyzer: indexSet?.index_analyzer,
    rotation_strategy: indexSet['rotation_strategy'],
    index_template_type: indexSet?.index_template_type,
    id: indexSet?.id,
    rotation_strategy_class: indexSet?.rotation_strategy_class,
    index_prefix: indexSet?.index_prefix
  };
};

export async function mapRuleToDto (rule) {
  return {
    field: rule?.field,
    description: rule?.description,
    type: rule?.type,
    inverted: rule?.inverted,
    value: rule?.value
  };
};

export async function mapStreamObjectToDto (destinationId, stream, destinationRules) {
  return {
    index_set_id: destinationId,
    matching_type: stream?.matching_type,
    remove_matches_from_default_stream:
      stream?.remove_matches_from_default_stream,
    description: stream?.description,
    rules: destinationRules,
    title: stream?.title,
    content_pack: stream?.content_pack
  };
};

export async function mapInputObjectToDto (input) {
  return {
    node: null,
    global: true,
    title: input?.title,
    type: input?.type,
    configuration: {
      recv_buffer_size: input?.attributes?.recv_buffer_size,
      tcp_keepalive: input?.attributes?.tcp_keepalive,
      use_null_delimiter: input?.attributes?.use_null_delimiter,
      tls_client_auth_cert_file: input?.attributes?.tls_client_auth_cert_file,
      bind_address: input?.attributes?.bind_address,
      tls_cert_file: input?.attributes?.tls_cert_file,
      port: input?.attributes?.port,
      tls_key_file: input?.attributes?.tls_key_file,
      tls_enable: input?.attributes?.tls_enable,
      tls_key_password: input?.attributes?.tls_key_password,
      max_message_size: input?.attributes?.max_message_size,
      tls_client_auth: input?.attributes?.tls_client_auth,
      override_source: input?.attributes?.override_source,
      expand_structured_data: input?.attributes?.expand_structured_data,
      force_rdns: input?.attributes?.force_rdns,
      allow_override_date: input?.attributes?.allow_override_date,
      store_full_message: input?.attributes?.store_full_message
    }
  };
};

export async function mapNotificationObjectToDto  (notification) {
  return {
    description: notification?.description,
    title: notification?.title,
    config: notification['config']
  };
};

export async function mapEventDefinitionsObjectToDto (notificationsList, finalStreamConfigList, definition) {
  return {
    description: definition?.description,
    priority: definition?.priority,
    title: definition?.title,
    alert: definition?.alert,
    field_spec: definition['field_spec'],
    key_spec: definition['key_spec'],
    notification_settings: definition['notification_settings'],
    // For each notification, we need to map and specify the notificationId related to
    notifications: notificationsList,
    // For each storage and config, we need to map and specify the steam id related to
    storage: [
      {
        type: 'persist-to-streams-v1',
        // this is the default stream named: All system events
        streams: ['000000000000000000000002']
      }
    ],
    config: {
      type: definition['config']?.type,
      event_limit: 20,
      query: definition['config']?.query,
      streams: finalStreamConfigList,
      group_by: definition['config']?.group_by,
      series: definition['config']?.series,
      conditions: definition['config']?.conditions,
      search_within_ms: definition['config']?.search_within_ms,
      execute_every_ms: definition['config']?.execute_every_ms
    }
  };
};

export async function mapNotificationObjForEvtDefinition (notificationId, notif) {
  return {
    notification_id: notificationId,
    notification_parameters: notif['notification_parameters']
  };
};

export async function mapStorageObjForEvtDefinition (streamsList, typeStor) {
  return {
    type: typeStor,
    streams: streamsList
  };
};

export async function mapViewObjDto (view) {
  return {
    owner: view.owner,
    summary: view.summary,
    description: view.description,
    state: view['state'],
    type: view.type,
    title: view.title,
    favorite: view.favorite,
    properties: view['properties'],
    requires: view['requires'],
    search_id: view.search_id
  };
};

export async function mapUserObjDto (userEmail, userUsername) {
  return {
    password: '123456789',
    email: userEmail,
    username: userUsername,
    permissions: [
      'clusterconfigentry:read',
      'indexercluster:read',
      'messagecount:read',
      'journal:read',
      'messages:analyze',
      'inputs:read',
      'metrics:read',
      'savedsearches:edit',
      'fieldnames:read',
      'buffers:read',
      'system:read',
      'savedsearches:create',
      'jvmstats:read',
      'decorators:read',
      'throughput:read',
      'savedsearches:read',
      'messages:read'
    ],
    roles: [
      'Reader'
    ],
    last_name: 'test',
    first_name: 'test'
  };
};

export async function mapSeachObjDto (search) {
  return {
    id: search.id,
    parameters: search.parameters,
    queries: search.queries
  };
};
